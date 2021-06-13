const Plan = require('../models/plan')
const planCtrl = {}

planCtrl.getPlan = async(req, res)=>{
    var plan = await Rol.find();
    res.json(plan);
}

planCtrl.createPlan = async(req, res)=>{
    var plan = new Plan(req.body);
    try{
        await plan.save();
        res.json({
            'status': '1',
            'msg': 'Plan Guardado'
        })
    } catch (error){
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion'
        })
    }
}
planCtrl.editPlan = async (req, res) => {
    const plan = new Plan(req.body);
    try {
        await Plan.updateOne({ _id: req.body._id }, plan);
        res.json({
            'status': '1',
            'msg': 'Plan updated'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

planCtrl.deletePlan= async (req, res) => {
    try {
        await Plan.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Plan removed'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = planCtrl;