import editoras from "../models/Editora.js";

class EditoraController {

  static listarEditoras = (req, res) => {
    editoras.find()
    .populate('autor')
    .exec((err, editoras) => {
      res.status(200).json(editoras)
    })
  }

  static listarEditoraPorID = (req, res) => {
    const id = req.params.id;

    editoras.findById(id)
    .populate('autor', 'nome' ) 
    //especificando as chaves no populate é possível limitar quais campos serão mostrados
    .exec((err, editoras) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Id do Editora não localizado.` })
      } else {
        res.status(200).send(editoras);
      }
    })
  }

  static cadastrarEditora = (req, res) => {
    let Editora = new editoras(req.body);

    Editora.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - falha ao cadastrar o Editora.` })

      } else {
        res.status(201).send(Editora.toJSON())
      }
    })
  }

  static atualizarEditora = (req, res) => {
    const id = req.params.id //params captura o que é passado na rota

    editoras.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Editora atualizado com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })

  }

  static excluirEditora = (req, res) => {
    const id = req.params.id;

    editoras.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Editora removido com sucesso' })
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora
    //query params, ou parâmetros de consulta, são um conjunto definido de parâmetros anexados ao final de uma URL
    //são as extensões que ficam após o "?"

    editoras.find({'editora': editora}, {}, (err, editoras) => {
      res.status(200).send(editoras)
    })
  }
}

export default EditoraController
