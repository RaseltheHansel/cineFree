 import { Router } from 'express';
import * as tmdb from '../controllers/tmdbController';
 
const router = Router();
 
// GET /api/movies/latest?region=PH&type=movie
router.get('/latest', async (req, res) => {
  const { region = 'US', type = 'movie' } = req.query;
  const data = type === 'tv'
    ? await tmdb.getLatestSeries(region as string)
    : await tmdb.getLatestMovies(region as string);
  res.json(data);
});
 
// GET /api/movies/oldest?region=JP
router.get('/oldest', async (req, res) => {
  const { region = 'US' } = req.query;
  res.json(await tmdb.getOldestMovies(region as string));
});
 
// GET /api/movies/trending?type=tv
router.get('/trending', async (req, res) => {
  const { type = 'movie' } = req.query;
  res.json(await tmdb.getTrending(type as 'movie' | 'tv'));
});
 
// GET /api/movies/search?q=inception
router.get('/search', async (req, res) => {
  const { q } = req.query;
  res.json(await tmdb.searchAll(q as string));
});
 
// GET /api/movies/countries
router.get('/countries', async (req, res) => {
  res.json(await tmdb.getCountries());
});
 
export default router;
