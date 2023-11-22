import React from 'react';
import { Card } from '../../components/Card';

export const Home: React.FC = () => {
  return (
    <div className="px-lg">
      <div className="text-ds-h1 font-bold mt-md mb-lg">
        Les dernières recettes
      </div>
      <div className="grid grid-cols-3 gap-lg ">
        <Card
          title="Green Salad"
          countPeople={2}
          imageUrl="thai-tossed-green-salad-recipe.png"
          preparationTime={25}
          cookingTime={15}
          difficulty="easy"
          category="plat"
          origin="france"
        />
      </div>
    </div>
  );
};
