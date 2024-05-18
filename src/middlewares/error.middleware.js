export function errorHandler(err, req, res, next){
  res.state(500).json({
    status: 500,
    message: err.message,
  })
}
