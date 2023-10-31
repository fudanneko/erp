package tw.idv.erp.order.product_quotation.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.order.product_quotation.dao.ProductQuotationDao;
import tw.idv.erp.order.product_quotation.entity.ProductQuotation;
import tw.idv.erp.order.product_quotation.service.ProductQuotationService;

import java.util.List;
import java.util.Optional;

@Service
public class ProductQuotationServiceImpl implements ProductQuotationService {
    @Autowired
    private ProductQuotationDao Dao;

    @Override
    public ProductQuotation add(ProductQuotation entity) {

        final ProductQuotation result = Dao.save(entity);
        if (result == null) {
            entity.setMessage("新增錯誤");
            entity.setSuccessful(false);
            return entity;
        }
        entity.setMessage("新增成功");
        entity.setSuccessful(true);
        return result;
    }

    @Override
    public ProductQuotation edit(ProductQuotation entity) {
        if (entity.getProductQuotationId() != null) {
            Optional<ProductQuotation> oentity = Dao.findById(entity.getProductQuotationId());
            if (oentity.isPresent()) {//確認opromotionCoupone是否為空
                ProductQuotation oldentity = oentity.get();//將它取出以更改值
                if (entity.getOrderDetailId() != null) {
                    oldentity.setOrderDetailId(entity.getOrderDetailId());
                }
                if (entity.getQuotationDate() != null) {
                    oldentity.setQuotationDate(entity.getQuotationDate());
                }
                if (entity.getMaterialUnitPrice() != null) {
                    oldentity.setMaterialUnitPrice(entity.getMaterialUnitPrice());
                }
                if (entity.getGrindingPrice() != null) {
                    oldentity.setGrindingPrice(entity.getGrindingPrice());
                }
                if (entity.getBreakingKnifegrindingPrice() != null) {
                    oldentity.setBreakingKnifegrindingPrice(entity.getBreakingKnifegrindingPrice());
                }
                if (entity.getHeatTreatmentPrice() != null) {
                    oldentity.setHeatTreatmentPrice(entity.getHeatTreatmentPrice());
                }
                if (entity.getWasherProcessingPrice() != null) {
                    oldentity.setWasherProcessingPrice(entity.getWasherProcessingPrice());
                }
                if (entity.getBreakingKnifeProcessingPrice() != null) {
                    oldentity.setBreakingKnifeProcessingPrice(entity.getBreakingKnifeProcessingPrice());
                }
                if (entity.getCrushingKnifeProcessingPrice() != null) {
                    oldentity.setCrushingKnifeProcessingPrice(entity.getCrushingKnifeProcessingPrice());
                }
                if (entity.getToothCount() != null) {
                    oldentity.setToothCount(entity.getToothCount());
                }
                if (entity.getWireCuttingPrice() != null) {
                    oldentity.setWireCuttingPrice(entity.getWireCuttingPrice());
                }
                if (entity.getHezhenQuotation() != null) {
                    oldentity.setHezhenQuotation(entity.getHezhenQuotation());
                }
                if (entity.getGuofengQuotation() != null) {
                    oldentity.setGuofengQuotation(entity.getGuofengQuotation());
                }
                if (entity.getGuoshengQuotation() != null) {
                    oldentity.setGuoshengQuotation(entity.getGuoshengQuotation());
                }
                if (entity.getHuataiQuotation() != null) {
                    oldentity.setHuataiQuotation(entity.getHuataiQuotation());
                }
                if (entity.getJinjiQuotation() != null) {
                    oldentity.setJinjiQuotation(entity.getJinjiQuotation());
                }
                if (entity.getOtherQuotation() != null) {
                    oldentity.setOtherQuotation(entity.getOtherQuotation());
                }
                if (entity.getHoleMultiplier() != null) {
                    oldentity.setHoleMultiplier(entity.getHoleMultiplier());
                }
                if (entity.getHoleCount() != null) {
                    oldentity.setHoleCount(entity.getHoleCount());
                }
                if (entity.getHoleMachiningPrice() != null) {
                    oldentity.setHoleMachiningPrice(entity.getHoleMachiningPrice());
                }
                if (entity.getOtherProcessingPrice() != null) {
                    oldentity.setOtherProcessingPrice(entity.getOtherProcessingPrice());
                }
                if (entity.getTotalCost() != null) {
                    oldentity.setTotalCost(entity.getTotalCost());
                }
                final ProductQuotation result = Dao.save(oldentity);
                oldentity.setSuccessful(result != null);
                oldentity.setMessage("修改成功");
                return oldentity;
            } else {
                return null;
            }
        } else {
            ProductQuotation result = Dao.save(entity);
            if (result == null) {
                entity.setMessage("新增錯誤");
                entity.setSuccessful(false);
                return entity;
            }
            entity.setMessage("新增成功");
            entity.setSuccessful(true);
            return result;
        }
    }

    @Override
    public List<ProductQuotation> findAll() {
        return Dao.findAll();
    }

    @Override
    public ProductQuotation findByPK(Integer orderDetailId) {
        Optional<ProductQuotation> entity = Dao.findById(orderDetailId);
        if (entity.isPresent()) {
            ProductQuotation entity2 = entity.get();
            return entity2;
        }
        return null;
    }

    @Override
    public boolean remove(Integer orderDetailId) {
        try {
            Dao.deleteById(orderDetailId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    @Override
    public ProductQuotation findByUK(Integer orderDetailId) {
        ProductQuotation entity = Dao.findByorderDetailId(orderDetailId);
        return entity;
    }
}
