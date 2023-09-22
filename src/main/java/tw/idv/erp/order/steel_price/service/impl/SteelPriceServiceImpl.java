package tw.idv.erp.order.steel_price.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.order.steel_price.dao.SteelPriceDao;
import tw.idv.erp.order.steel_price.entity.SteelPrice;
import tw.idv.erp.order.steel_price.service.SteelPriceService;

import java.util.List;
import java.util.Optional;

@Service
public class SteelPriceServiceImpl implements SteelPriceService {
    @Autowired
    private SteelPriceDao Dao;

    @Override
    public SteelPrice add(SteelPrice steelPrice) {

        final SteelPrice result = Dao.save(steelPrice);
        if (result == null) {
            steelPrice.setMessage("新增錯誤");
            steelPrice.setSuccessful(false);
            return steelPrice;
        }
        steelPrice.setMessage("新增成功");
        steelPrice.setSuccessful(true);
        return result;
    }

    @Override
    public SteelPrice edit(SteelPrice steelPrice) {
        System.out.println(steelPrice.getSteelId());
        Optional<SteelPrice> osteelPrice = Dao.findById(steelPrice.getSteelId());
        if (osteelPrice.isPresent()) {//確認opromotionCoupone是否為空
            SteelPrice oldsteelPrice = osteelPrice.get();//將它取出以更改值

            if (steelPrice.getSteelMaterial() != null) {//若名稱不為空則取代舊值
                oldsteelPrice.setSteelMaterial(steelPrice.getSteelMaterial());
            }
            if (steelPrice.getSteelMinSize() != null) {
                oldsteelPrice.setSteelMinSize(steelPrice.getSteelMinSize());
            }
            if (steelPrice.getSteelMaxSize() != null) {
                oldsteelPrice.setSteelMaxSize(steelPrice.getSteelMaxSize());
            }
            if (steelPrice.getSteelUnitPrice() != null) {
                oldsteelPrice.setSteelUnitPrice(steelPrice.getSteelUnitPrice());
            }
            final SteelPrice result = Dao.save(oldsteelPrice);
            oldsteelPrice.setSuccessful(result != null);
            oldsteelPrice.setMessage("修改成功");
            return oldsteelPrice;
        } else {
            return null;
        }
    }

    @Override
    public List<SteelPrice> findAll() {
        return Dao.findAll();
    }

    @Override
    public SteelPrice findByPK(Integer steelId) {
        Optional<SteelPrice> steelPrice = Dao.findById(steelId);
        if (steelPrice.isPresent()) {
            SteelPrice steelPrice2 = steelPrice.get();
            return steelPrice2;
        }
        return null;
    }

    @Override
    public boolean remove(Integer steelId) {
        try {
            Dao.deleteById(steelId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


}
