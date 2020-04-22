const { secret } = require('../config');
const Question = require('../models/question');

class QuestionCtl {
  async find(ctx) {
    const { per_page = 10, q = '' } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1);
    const perPage = Math.max(per_page * 1, 1);
    const qRegExp = new RegExp(q);
    ctx.body = await Topic.find({ $or: [{ title: qRegExp, description: qRegExp }] })
      .limit(perPage)
      .skip((page - 1) * perPage);
  }

  async checkQuestionExist(ctx, next) {
    const question = await Question.findById(ctx.params.id).select('+questioner');
    if (!question) {
      ctx.throw(404, '问题不存在');
    }
    ctx.state.question = question;
    await next();
  }

  async findById(ctx) {
    const { fields } = ctx.query;
    const selectFields =
      '+' +
      fields.split(';').reduce((pre, current) => {
        if (current && current !== 'password') {
          pre += ' +' + current;
        }
        return pre;
      }, []);
    const question = await Question.findById(ctx.params.id)
      .select(selectFields)
      .populate('questioner');
    ctx.body = question;
  }

  async create(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      description: { type: 'string', required: false },
    });
    const question = await new Question({
      ...ctx.request.body,
      questioner: ctx.state.user._id,
    }).save();
    ctx.body = question;
  }

  async update(ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      description: { type: 'string', required: false },
    });
    ctx.state.question.update(ctx.request.body);
    ctx.body = question;
  }

  async delete(ctx) {
    await Question.findByIdAndRemove(ctx.params.id);
    ctx.status = 204;
  }
}

module.exports = new QuestionCtl();
