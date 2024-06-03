class TesteController {
  async index(req, res) {
    res.json(req.headers);
  }
}

module.exports = new TesteController();