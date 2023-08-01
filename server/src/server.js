import app    from './controllers/app.js'
import * as v from '../global/var.js'

const __init__ = () => {
  app().listen(v.PORT, (err) => {
    if (err) throw err
    console.log(`Connection established on PORT: ${v.PORT}`);
  })
}

__init__()