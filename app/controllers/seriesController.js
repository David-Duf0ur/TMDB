import "dotenv/config";
import fetch from "node-fetch";
//total page top rated : ???
const seriesController = {
    async index(req, res) {
        const { page } = req.params

        try {
            const url = `https://api.themoviedb.org/3/tv/top_rated?language=fr-FR&page=${page}`;
            const options = {
                method: 'GET', headers: {
                    accept: 'application/json',
                    Authorization: process.env.TMDB_KEY
                }
            };

            const nbrPage = await fetch(url, options)
            const dataNbrPage = await nbrPage.json()

            const resultat = await fetch(url, options)
            const data = await resultat.json()

            return res.render('home_movies', { data: data.results, nbrPage: dataNbrPage.total_pages, type: 'series' });
        } catch (error) {
            console.log(error);
        }
    },

    async formSearch(req, res) {
        const { idNbre, name } = req.body
        let url

        const options = {
            method: 'GET', headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_KEY
            }
        };

        if (!idNbre && !name) {
            return res.redirect('/1');
        }

        if (name) {
            url = `https://api.themoviedb.org/3/search/tv?language=fr-FR&query=${name}`;
        }

        if (idNbre) {
            url = `https://api.themoviedb.org/3/tv/${idNbre}?language=fr-FR`;
        }

        const resultat = await fetch(url, options)
        let data = await resultat.json()

        if (name && !idNbre) {
            data = data.results
            return res.render('home_movies', { data, nbrPage: null, idNbre, type: 'series' })
        }

        if (idNbre && !name || idNbre && name) {

            return res.render('movie', { data, nbrPage: null, idNbre, type: 'series' });
        }

        return res.redirect('/1')
    },
    async movieDetail(req, res) {
        const { id } = req.params

        const url = `https://api.themoviedb.org/3/tv/${id}?language=fr-FR`;
        const urlForImages = `https://api.themoviedb.org/3/tv/${id}/images`;
        const urlForVideo = `https://api.themoviedb.org/3/tv/${id}/videos?language=fr-FR`;

        const options = {
            method: 'GET', headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_KEY
            }
        };

        const resultat = await fetch(url, options)
        const data = await resultat.json()

        const resultatImages = await fetch(urlForImages, options)
        const dataImages = await resultatImages.json()

        const resultatVideos = await fetch(urlForVideo, options)
        const dataVideos = await resultatVideos.json()
        console.log(dataVideos.results[0].key);

        return res.render('movie', { data, dataImages: dataImages.backdrops, dataVideos: dataVideos.results, type: 'series' });
    }
}

export { seriesController };