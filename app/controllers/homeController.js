import "dotenv/config";
import fetch from "node-fetch";
//total page top rated : 482
const homeController = {
    async home(req, res) {
        // res.render('home', { data: null, nbrPage: null, home: true });
        res.redirect('/1');
    },
    async index(req, res) {
        const { page } = req.params

        try {
            const url = `https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=${page}`;
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
            return res.render('home', { data: data.results, nbrPage: dataNbrPage.total_pages, home: false });
        } catch (error) {
            console.log(error);
        }
    },

    async formSearch(req, res) {
        const { idNbre, name } = req.body
        let url

        if (!idNbre && !name) {
            return res.redirect('/1');
        }

        if (name) {
            url = `https://api.themoviedb.org/3/search/movie?language=fr-FR&query=${name}`;
        }

        if (idNbre) {
            url = `https://api.themoviedb.org/3/movie/${idNbre}?language=fr-FR`;
        }

        const options = {
            method: 'GET', headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_KEY
            }
        };

        const resultat = await fetch(url, options)
        let data = await resultat.json()

        if (name) {
            data = data.results
            return res.render('home', { data, nbrPage: null, home: false, idNbre })
        }

        return res.render('movie', { data, nbrPage: null, home: false, idNbre });
    },
    async movieDetail(req, res) {
        const { id } = req.params

        const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;
        const options = {
            method: 'GET', headers: {
                accept: 'application/json',
                Authorization: process.env.TMDB_KEY
            }
        };

        const resultat = await fetch(url, options)
        const data = await resultat.json()

        return res.render('movie', { data });
    }
}

export { homeController };