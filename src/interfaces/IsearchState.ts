import { FormCardProps } from '../components/Form';
import Character from './Character';

export default interface IState {
  search: {
    query: string;
    characterId: number | null;
    characters: Character[] | null;
    cardList: FormCardProps[];
  };
}
