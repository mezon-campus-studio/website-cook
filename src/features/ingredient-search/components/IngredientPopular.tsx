import IngredientCard from "./IngredientCard";

const mockData = [
    { id: 1, name: "Tỏi", image: "/assets/images/tomato.png" },
    { id: 2, name: "Cà chua", image: "/assets/images/tomato.png" },
    { id: 3, name: "Trứng", image: "/assets/images/egg.png" },
    { id: 4, name: "Súp lơ", image: "/assets/images/broccoli.png" },
    { id: 5, name: "Hành tây", image: "/assets/images/broccoli.png" },
];

export default function IngredientPopular() {
    return (
        <section className='w-full flex flex-col items-center mt-12 px-16'>
            <h2 className='text-[30px] font-bold font-epilogue text-brand-orange '>Nguyên liệu phổ biến</h2>
            <ul className='grid grid-cols-5 gap-4 mt-12 w-full'>
                {mockData.map((item) => (
                    <li key={item.id}>
                        <IngredientCard name={item.name} image={item.image} />
                    </li>
                ))}
            </ul>
        </section>
    )
}