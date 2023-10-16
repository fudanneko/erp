package tw.idv.erp.order.grinding_price.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.order.grinding_price.dao.GrindingPriceDao;
import tw.idv.erp.order.grinding_price.entity.GrindingPrice;
import tw.idv.erp.order.grinding_price.service.GrindingPriceService;

import java.util.List;
import java.util.Optional;

@Service
public class GrindingPriceServiceImpl implements GrindingPriceService {
    @Autowired
    private GrindingPriceDao Dao;

    @Override
    public GrindingPrice add(GrindingPrice entity) {

        final GrindingPrice result = Dao.save(entity);
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
    public GrindingPrice edit(GrindingPrice entity) {
        Optional<GrindingPrice> oentity = Dao.findById(entity.getGrindingId());
        if (oentity.isPresent()) {//確認opromotionCoupone是否為空
            GrindingPrice oldentity = oentity.get();//將它取出以更改值

            if (entity.getGrindingVendor() != null) {//若名稱不為空則取代舊值
                oldentity.setGrindingVendor(entity.getGrindingVendor());
            }
            if (entity.getGrindingType() != null) {
                oldentity.setGrindingType(entity.getGrindingType());
            }
            if (entity.getGrindingMinSize() != null) {
                oldentity.setGrindingMinSize(entity.getGrindingMinSize());
            }
            if (entity.getGrindingMaxSize() != null) {
                oldentity.setGrindingMaxSize(entity.getGrindingMaxSize());
            }
            if (entity.getGrindingUnitPrice() != null) {
                oldentity.setGrindingUnitPrice(entity.getGrindingUnitPrice());
            }
            final GrindingPrice result = Dao.save(oldentity);
            oldentity.setSuccessful(result != null);
            oldentity.setMessage("修改成功");
            return oldentity;
        } else {
            return null;
        }
    }

    @Override
    public List<GrindingPrice> findAll() {
        return Dao.findAll();
    }

    @Override
    public GrindingPrice findByPK(Integer grindingId) {
        Optional<GrindingPrice> order = Dao.findById(grindingId);
        if (order.isPresent()) {
            GrindingPrice order2 = order.get();
            return order2;
        }
        return null;
    }

    @Override
    public boolean remove(Integer grindingId) {
            try {
                Dao.deleteById(grindingId);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
    }

}
