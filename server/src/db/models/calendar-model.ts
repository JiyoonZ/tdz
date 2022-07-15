import { model } from 'mongoose';
import { CalendarSchema } from '../schemas/calendar-schema';
import {
  CalendarData,
  CalendarInfo,
  ToUpdate,
} from '../../customType/calendar.type';
import { DayInfo, FromToInfo } from '../../customType/chart.type';

const Calendar = model<CalendarData>('calendars', CalendarSchema);

export class CalendarModel {
  // 유저별 도장 조회
  async findById(userId: string): Promise<CalendarData[] | null> {
    return await Calendar.find({ userId }).lean();
  }

  // 도장 상세 조회
  async findByCalendarId(calendarId: string): Promise<CalendarData | null> {
    return await Calendar.find({ _id: calendarId }).lean();
  }

  // 도장 생성
  async create(calendarInfo: CalendarInfo): Promise<CalendarData> {
    return await Calendar.create(calendarInfo);
  }

  // 도장 데이터 수정
  async update({ calendarId, update }: ToUpdate): Promise<CalendarData | null> {
    const filter = { _id: calendarId };
    const option = { new: true };
    return await Calendar.findOneAndUpdate(filter, update, option);
  }

  // 유저 도장 전체 삭제
  async delete(userId: string): Promise<{ deletedCount?: number }> {
    return await Calendar.deleteMany({ userId });
  }

  //유저의 기간별 조회
  async findByDate(fromToInfo: FromToInfo): Promise<CalendarData[] | null> {
    return await Calendar.find({
      $and: [
        { userId: fromToInfo.user_id },
        {
          date: {
            $gte: new Date(fromToInfo.from),
            $lt: new Date(fromToInfo.to),
          },
        },
      ],
    }).sort({ date: 1 });
  }

  //유저의 주간별 조회
  // findByWeek;

  //유저의 월별 조회
}

const calendarModel = new CalendarModel();

export { calendarModel };
function ISODate(arg0: string): Date | undefined {
  throw new Error('Function not implemented.');
}
