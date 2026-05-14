import { Recipe } from '../types/Recipe'
import RecipeCard from './RecipeCard'

const mockData: Recipe[] = [
  {
    id: 1,
    title: 'Phở Bò Truyền Thống',
    image: '/assets/images/img1.png',
    matchPercent: 100,
    description: 'Sẵn sàng để nấu. Bạn đã có đủ tất cả nguyên liệu cần thiết cho món ăn này.'
  },

  {
    id: 2,
    title: 'Gỏi Cuốn Tôm Thịt',
    image: '/assets/images/img2.png',
    matchPercent: 80,
    missingIngredients: ['Bánh tráng', 'Rau sống']
  },

  {
    id: 3,
    title: 'Cơm Tấm Sườn Bì Chả',
    image: '/assets/images/img3.png',
    matchPercent: 70,
    missingIngredients: ['Sườn non', 'Nước mắm']
  },

  {
    id: 4,
    title: 'Bún Chả Hà Nội',
    image: '/assets/images/img4.png',
    matchPercent: 100,
    description: 'Sẵn sàng để nấu. Công thức này hoàn toàn phù hợp với nguyên liệu trong bếp của bạn.'
  },

  {
    id: 5,
    title: 'Cơm Chiên Dương Châu',
    image: '/assets/images/img5.png',
    matchPercent: 90,
    missingIngredients: ['Lạp xưởng', 'Rau thơm']
  },

  {
    id: 6,
    title: 'Salad Rau Củ Tươi',
    image: '/assets/images/img6.png',
    matchPercent: 100,
    description: 'Sẵn sàng để nấu. Món khai vị thanh đạm và đầy đủ dinh dưỡng cho ngày hè.'
  }
]

function RecipeList() {
  return (
    <section className='grid grid-cols-3 gap-x-4 gap-y-10 mt-16'>
      {mockData.map((item: Recipe) => (
        <RecipeCard key={item.id} title={item.title} image={item.image} matchPercent={item.matchPercent} description={item.description} missingIngredients={item.missingIngredients} />
      ))}
    </section>
  )
}

export default RecipeList