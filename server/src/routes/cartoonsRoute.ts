import { Router } from 'express';
import * as tmdb from '../controllers/tmdbController';
 
const router = Router();
 

router.get('/', async (req, res) => {
  const { region = 'US', filter = 'latest', type = 'movie' } = req.query;
  let data;
 
  if (filter === 'oldest')
    data = await tmdb.getOldestCartoons(region as string);
  else if (type === 'tv')
    data = await tmdb.getLatestAnimatedSeries(region as string);
  else if (filter === 'anime')
    data = await tmdb.getAnime();
  else
    data = await tmdb.getLatestCartoons(region as string);
 
  res.json(data);
});
 
export default router;
