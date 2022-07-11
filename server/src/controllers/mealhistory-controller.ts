import is from '@sindresorhus/is';
import { Request, Response } from 'express';
import { mealhistoryService } from '../services';
import { mealInfo } from '../customType/mealhistory.type';

class MealHistoryController {
  async getHistory(req: Request, res: Response, next) {
    try {
      const user_id: string = req.currentUserId;
      const date: Date = new Date(req.params.date);

      const newMealData = await mealhistoryService.getMealHistory(
        user_id,
        date,
      );

      res.status(200).json(newMealData);
    } catch (error) {
      next(error);
    }
  }

  async createHistory(req: Request, res: Response, next) {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }
      // req (request) 에서 데이터 가져오기
      const user_id: string = req.currentUserId;
      const date: Date = new Date(req.body.date);
      const category: string = req.body.category;
      const meals: [mealInfo] = req.body.meals;

      // db에 저장
      const newMealHistory = await mealhistoryService.addMealHistory({
        user_id,
        date,
        category,
        meals,
      });

      res.status(201).json(newMealHistory);
    } catch (error) {
      next(error);
    }
  }

  async updateHistory(req: Request, res: Response, next) {
    try {
      // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요',
        );
      }

      // req (request) 에서 데이터 가져오기
      const mealhistory_id: string = req.params.mealhistory_id;
      const date: Date = new Date(req.body.date);
      const category: string = req.body.category;
      const meals: [mealInfo] = req.body.meals;

      const toUpdate = {
        ...(mealhistory_id && { mealhistory_id }),
        ...(date && { date }),
        ...(category && { category }),
        ...(meals && { meals }),
      };

      const updatedHistory = await mealhistoryService.setHistory(
        mealhistory_id,
        toUpdate,
      );

      res.status(200).json(updatedHistory);
    } catch (error) {
      next(error);
    }
  }

  async deletHistory(req: Request, res: Response, next) {
    try {
      const mealhistory_id = req.params.mealhistory_id;
      const deleteResult = await mealhistoryService.deleteMealHistory(
        mealhistory_id,
      );
      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
}

const mealhistoryController = new MealHistoryController();
export { mealhistoryController };
