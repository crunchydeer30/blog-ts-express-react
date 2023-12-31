/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import CreateTopicDto from '../dto/createTopicDto';
import { validationMiddleware } from '../validation';
import topicsService from '../services/topicsService';
import { auth } from '../utils/middleware';

const topicRouter = Router();

topicRouter.get('/', auth.optional, async (req, res, next) => {
  const query = req.query;

  try {
    const topics = await topicsService.getAll(query);
    return res.status(200).json(topics);
  } catch (e) {
    return next(e);
  }
});

topicRouter.get('/:id', auth.optional, async (req, res, next) => {
  try {
    const topic = await topicsService.getById(req.params.id);
    return res.status(200).json(topic);
  } catch (e) {
    return next(e);
  }
});

topicRouter.post(
  '/',
  auth.admin,
  validationMiddleware(CreateTopicDto),
  async (req, res, next) => {
    try {
      const data = req.body as CreateTopicDto;
      const newTopic = await topicsService.create(data);
      return res.status(201).json(newTopic);
    } catch (e) {
      return next(e);
    }
  }
);

export default topicRouter;
