const { secret } = require('../config');
const Topic = require('../models/topic');

class TopicCtl {
  async find(ctx) {
    const { per_page = 10, q = '' } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1);
    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await Topic.find({ name: new RegExp(q) })
      .limit(perPage)
      .skip((page - 1) * perPage);
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
    const topic = await Topic.findById(ctx.params.id).select(selectFields);
    ctx.body = topic;
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    });
    const topic = await new Topic(ctx.request.body).save();
    ctx.body = topic;
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    });
    const topic = await Topic.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    ctx.body = topic;
  }

  // async delete(ctx) {
  //   await Topic.findByIdAndRemove(ctx.params.id);
  //   ctx.status = 204;
  // }
}

module.exports = new TopicCtl();
