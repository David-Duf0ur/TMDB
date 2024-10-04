import "dotenv/config";

const homeController = {
    async home(req, res) {
        res.render('home');
    },
}

export { homeController };