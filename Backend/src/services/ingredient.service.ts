import { NotFoundError } from '../httpErrors';

export class IngredientService {
  static async getAllIngredients() {
    // Dữ liệu mock (giả lập)
    return [
      { id: '1', name: 'Muối', category: 'Gia vị' },
      { id: '2', name: 'Đường', category: 'Gia vị' },
      { id: '3', name: 'Tiêu', category: 'Gia vị' }
    ];
  }

  static async getIngredientById(id: string) {
    if (id === '999') {
      throw new NotFoundError(`Nguyên liệu với ID ${id} không tồn tại.`);
    }

    return {
      id,
      name: 'Nguyên liệu mẫu',
      category: 'Gia vị',
      description: 'Đây là dữ liệu mẫu trả về thành công.'
    };
  }
}
