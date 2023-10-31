package tw.idv.erp.order.heat_treatment_price.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.order.heat_treatment_price.dao.HeatTreatmentPriceDao;
import tw.idv.erp.order.heat_treatment_price.entity.HeatTreatmentPrice;
import tw.idv.erp.order.heat_treatment_price.service.HeatTreatmentPriceService;

import java.util.List;
import java.util.Optional;

@Service
public class HeatTreatmentPriceServiceImpl implements HeatTreatmentPriceService {
    @Autowired
    private HeatTreatmentPriceDao Dao;

    @Override
    public HeatTreatmentPrice add(HeatTreatmentPrice entity) {

        final HeatTreatmentPrice result = Dao.save(entity);
        if (result == null) {
            entity.setMessage("新增錯誤");
            entity.setSuccessful(false);
            return entity;
        }
        result.setMessage("新增成功");
        result.setSuccessful(true);
        return result;
    }

    @Override
    public HeatTreatmentPrice edit(HeatTreatmentPrice entity) {
        Optional<HeatTreatmentPrice> oentity = Dao.findById(entity.getHeatTreatmentId());
        if (oentity.isPresent()) {//確認opromotionCoupone是否為空
            HeatTreatmentPrice oldentity = oentity.get();//將它取出以更改值

            if (entity.getHeatTreatmentMaterial() != null) {//若名稱不為空則取代舊值
                oldentity.setHeatTreatmentMaterial(entity.getHeatTreatmentMaterial());
            }
            if (entity.getHeatTreatmentUnitPrice() != null) {
                oldentity.setHeatTreatmentUnitPrice(entity.getHeatTreatmentUnitPrice());
            }
            final HeatTreatmentPrice result = Dao.save(oldentity);
            oldentity.setSuccessful(result != null);
            oldentity.setMessage("修改成功");
            return oldentity;
        } else {
            return null;
        }
    }

    @Override
    public List<HeatTreatmentPrice> findAll() {
        return Dao.findAll();
    }

    @Override
    public HeatTreatmentPrice findByPK(Integer heatTreatmentId) {
        Optional<HeatTreatmentPrice> order = Dao.findById(heatTreatmentId);
        if (order.isPresent()) {
            HeatTreatmentPrice order2 = order.get();
            return order2;
        }
        return null;
    }

    @Override
    public boolean remove(Integer heatTreatmentId) {
            try {
                Dao.deleteById(heatTreatmentId);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
    }

}
