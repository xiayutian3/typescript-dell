import { Router, Request, Response } from "express";
import Crowller from './crowller';
import DellAnalyzer from './DellAnalyzer'


const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`
  <form action="/getdata" method="post">
    <input type="password" name="password"/>
    <button>提交</button>
  </form>
`);
})
router.post('/getdata', (req: Request, res: Response) => {
  // const { password } = req.body;
  console.log(req.body)
  if( req.body.password !== '123' ){
    res.send('password error')
  }
  //爬取电影网站 
  const url = `https://www.xbshare.cc/hot/hotmovie.html`

  const analyzer = DellAnalyzer.getInstance()
  const crowller = new Crowller(url, analyzer)
  res.send('data sucess');
})

export default router