import { LinRouter } from 'lin-mizar';
import { AddContentValidator, DeleteContentValidator, EditContenValidator } from '../../validator/content';
import { ContentService } from '../../service/content';
import { groupRequired } from '../../middleware/jwt';
import { logger } from '../../middleware/logger';

const contentApi = new LinRouter({
  prefix: '/v1/content'
});

// 1. 权限控制

// 2. 行为日志

contentApi.linPost('addcontent', '/', {
  permission: '添加期刊内容',
  module: '内容管理',
  mount: true
}, groupRequired,
logger('{user.username}就是皮了一波'),
async ctx => {
  // 1.参数校验
  const v = await new AddContentValidator().validate(ctx);
  await ContentService.addContent(v.get('body'));
  ctx.success({
    msg: '新增内容成功'
  });
});

contentApi.get('/', async ctx => {
  const contentList = await ContentService.getContentList();
  ctx.json(contentList);
});

contentApi.linPut('editcontent', '/:id', {
  permission: '编辑期刊内容',
  module: '内容管理',
  mount: true
}, groupRequired,
logger('{user.username}编辑期刊内容'), async ctx => {
  const v = await new EditContenValidator().validate(ctx);
  const id = v.get('path.id');
  const params = v.get('body');

  await ContentService.editContent(id, params);
  ctx.success({
    msg: '更新内容成功'
  });
});

contentApi.linDelete('deletecontent', '/:id', {
  permission: '删除期刊内容',
  module: '内容管理',
  mount: true
}, groupRequired,
logger('{user.username}删除了期刊内容'), async ctx => {
  const v = await new DeleteContentValidator().validate(ctx);
  const id = v.get('path.id');
  const type = v.get('query.type');

  await ContentService.deleteContent(id, type);
  ctx.success({
    msg: '删除内容成功'
  });
});

module.exports = { contentApi };
