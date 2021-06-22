const Pago = require('../models/pago')
const pagoCtrl = {}

pagoCtrl.getPago = async(req, res)=>{
    var pagos = await Pago.find().populate();
    res.json(pagos);
}

pagoCtrl.createPago = async(req, res)=>{
    var pago = new Pago(req.body);
    try{
        await pago.save();
        res.json({
            'status': '1',
            'msg': 'Pago Guardado'
        })
    } catch (error){
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion'
        })
    }
}
pagoCtrl.editPago = async (req, res) => {
    const pago = new Pago(req.body);
    try {
        await Pago.updateOne({ _id: req.body._id }, pago);
        res.json({
            'status': '1',
            'msg': 'Pago updated'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

pagoCtrl.deletePago= async (req, res) => {
    try {
        await Pago.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Pago removed'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = pagoCtrl;