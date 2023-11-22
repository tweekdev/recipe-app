import { Link } from 'react-router-dom';
import { Button } from '../Button';

export const Navbar: React.FC = () => {
  return (
    <header className="w-[1560px] h-[4rem] mt-lg flex justify-between items-center gap-md mx-xl">
      <div>TweekRecipe</div>
      <div className="flex gap-md font-bold">
        <Link to="/home">Accueil</Link>
        <Link to="/recipes">recettes</Link>
        <Link to="/recipe">recette</Link>
      </div>
      <div>
        <Button className="btn btn-primary">Connexion</Button>
      </div>
    </header>
  );
};
