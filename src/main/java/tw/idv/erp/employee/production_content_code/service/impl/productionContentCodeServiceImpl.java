package tw.idv.erp.employee.production_content_code.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.employee.production_content_code.dao.ProductionContentCodeDao;
import tw.idv.erp.employee.production_content_code.entity.ProductionContentCode;
import tw.idv.erp.employee.production_content_code.service.productionContentCodeService;

import java.util.List;
import java.util.Optional;

@Service
public class productionContentCodeServiceImpl implements productionContentCodeService {
    @Autowired
    private ProductionContentCodeDao Dao;

    @Override
    public ProductionContentCode add(ProductionContentCode entity) {

        final ProductionContentCode result = Dao.save(entity);
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
    public ProductionContentCode edit(ProductionContentCode entity) {
        Optional<ProductionContentCode> oentity = Dao.findById(entity.getProductionContentCode());
        if (oentity.isPresent()) {//確認opromotionCoupone是否為空
            ProductionContentCode oldentity = oentity.get();//將它取出以更改值

            if (entity.getProductionContentName() != null) {
                oldentity.setProductionContentName(entity.getProductionContentName());
            }
            if (entity.getProductionPerformanceMultiplier() != null) {
                oldentity.setProductionPerformanceMultiplier(entity.getProductionPerformanceMultiplier());
            }
            final ProductionContentCode result = Dao.save(oldentity);
            oldentity.setSuccessful(result != null);
            oldentity.setMessage("修改成功");
            return oldentity;
        } else {
            return null;
        }
    }

    @Override
    public List<ProductionContentCode> findAll() {
        return Dao.findAll();
    }

    @Override
    public ProductionContentCode findByPK(String productionContentCode) {
        Optional<ProductionContentCode> order = Dao.findById(productionContentCode);
        if (order.isPresent()) {
            ProductionContentCode order2 = order.get();
            return order2;
        }
        return null;
    }

    @Override
    public boolean remove(String productionContentCode) {
            try {
                Dao.deleteById(productionContentCode);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
    }

}
