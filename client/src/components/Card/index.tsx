import classNames from 'classnames';
import React from 'react';
import { Button } from '../Button';
type Props = {
  title: string;
  imageUrl: string;
  countPeople: number;
  className?: string;
  preparationTime: number;
  difficulty: 'hard' | 'medium' | 'easy';
  category: 'dessert' | 'plat' | 'entree';
  origin: string;
  cookingTime: number;
};

export const Card: React.FC<Props> = ({
  title,
  imageUrl,
  countPeople,
  className,
  preparationTime,
  difficulty,
  category,
  origin,
  cookingTime,
}) => {
  return (
    <div
      className={classNames(
        'w-[485px] h-[485px] rounded-lg shadow-ds-xs overflow-hidden',
        className,
      )}
    >
      <div className="h-[333px]">
        <img src={imageUrl} alt="Logo" />
      </div>
      <div className="w-full p-md flex justify-between">
        <div className="text-ds-h6 font-bold">{title}</div>
        <div>{countPeople}</div>
        <div>{preparationTime}</div>
        <div>{difficulty}</div>
        <div>{category}</div>
        <div>{origin}</div>
        <div>{cookingTime}</div>
      </div>
      <div className="w-full p-md flex justify-between">
        <Button className="btn btn-primary">Voir la recette</Button>
      </div>
    </div>
  );
};
