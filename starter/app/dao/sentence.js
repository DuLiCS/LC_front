import { SentenceModel } from '../model/sentence';
import { MovieModel } from '../model/movie';
import { NotFound } from 'lin-mizar';

class Sentence {
  static async getSentenceList(){
    const res = SentenceModel.findAll()
    return res
  }

  static async addSentence (v) {
    return SentenceModel.create(v);
  }

  static async editSentence(id, params){
    const sentence = await SentenceModel.findByPk(id)
    if (!sentence){
      throw new NotFound()
    }

    return await sentence.update({ ...params })
  }

  static async deleteSentenceById(id) {
    return await SentenceModel.destroy({
      where : {id},
    })
  }
}


export { Sentence as SentenceDao }
