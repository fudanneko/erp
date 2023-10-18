package tw.idv.erp.order.tooth_count_price.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.order.tooth_count_price.dao.ToothCountPriceDao;
import tw.idv.erp.order.tooth_count_price.entity.ToothCountPrice;
import tw.idv.erp.order.tooth_count_price.service.ToothCountPriceService;

import java.util.List;
import java.util.Optional;

@Service
public class ToothCountPriceServiceImpl implements ToothCountPriceService {
    @Autowired
    private ToothCountPriceDao Dao;

    @Override
    public ToothCountPrice add(ToothCountPrice entity) {

        final ToothCountPrice result = Dao.save(entity);
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
    public ToothCountPrice edit(ToothCountPrice entity) {
        Optional<ToothCountPrice> oentity = Dao.findById(entity.getToothId());
        if (oentity.isPresent()) {//確認opromotionCoupone是否為空
            ToothCountPrice oldentity = oentity.get();//將它取出以更改值

            if (entity.getToothMinThickness() != null) {//若名稱不為空則取代舊值
                oldentity.setToothMinThickness(entity.getToothMinThickness());
            }
            if (entity.getToothMaxThickness() != null) {//若名稱不為空則取代舊值
                oldentity.setToothMaxThickness(entity.getToothMaxThickness());
            }
            if (entity.getToothUnitPrice() != null) {//若名稱不為空則取代舊值
                oldentity.setToothUnitPrice(entity.getToothUnitPrice());
            }

            final ToothCountPrice result = Dao.save(oldentity);
            oldentity.setSuccessful(result != null);
            oldentity.setMessage("修改成功");
            return oldentity;
        } else {
            return null;
        }
    }

    @Override
    public List<ToothCountPrice> findAll() {
        return Dao.findAll();
    }

    @Override
    public ToothCountPrice findByPK(Integer toothId) {
        Optional<ToothCountPrice> order = Dao.findById(toothId);
        if (order.isPresent()) {
            ToothCountPrice order2 = order.get();
            return order2;
        }
        return null;
    }

    @Override
    public boolean remove(Integer toothId) {
            try {
                Dao.deleteById(toothId);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
    }

}
