import { Model as HistoryModel, Op } from 'sequelize';


export class HistoryService {
  async getHistory(filters) {

    const where = {};

    if (filters.startDate || filters.endDate) {
      const startDate = filters.startDate ? new Date(`${filters.startDate}T00:00:00`) : null;
      const endDate = filters.endDate ? new Date(`${filters.endDate}T23:59:59`) : null;

      if (startDate && endDate) {
        where.date = { [Op.between]: [startDate, endDate] };
      } else if (startDate) {
        where.date = { [Op.gte]: startDate };
      } else if (endDate) {
        where.date = { [Op.lte]: endDate };
      }
    }

    if (filters.shop_id) {
      where.shop_id = filters.shop_id;
    }

    if (filters.plu) {
      where.plu = filters.plu;
    }

    if (filters.action) {
      where.action = filters.action;
    }

    return await HistoryModel.findAll({
      where,
    });

  }
}
