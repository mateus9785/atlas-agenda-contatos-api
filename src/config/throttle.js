var options = {
    burst: 10,
    period: "1min",
    on_throttled: function(req, res, next, bucket) {
      res.set("X-Rate-Limit-Limit", 5);
      res.set("X-Rate-Limit-Remaining", 0);
      res.set("X-Rate-Limit-Reset", bucket.etime);
      res.status(503).send({ message: "Você excedeu o número de tentativas, deseja alterar sua senha?" });
    }
};

module.exports = options;