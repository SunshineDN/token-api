class TesteController {
  async index(req, res) {
    res.json(req.body);
  }
}

module.exports = new TesteController();