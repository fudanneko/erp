package tw.idv.erp.order.product_category.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tw.idv.erp.order.product_category.dao.ProductCategoryDao;
import tw.idv.erp.order.product_category.entity.ProductCategory;
import tw.idv.erp.order.product_category.service.CategoryService;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private ProductCategoryDao Dao;

    @Override
    public ProductCategory add(ProductCategory category) {

        final ProductCategory result = Dao.save(category);
        if (result == null) {
            category.setMessage("新增錯誤");
            category.setSuccessful(false);
            return category;
        }
        category.setMessage("新增成功");
        category.setSuccessful(true);
        return result;
    }

    @Override
    public ProductCategory edit(ProductCategory category) {
        System.out.println(category.getCategoryId());
        Optional<ProductCategory> ocategory = Dao.findById(category.getCategoryId());
        if (ocategory.isPresent()) {//確認opromotionCoupone是否為空
            ProductCategory oldcategory = ocategory.get();//將它取出以更改值

            if (category.getCategoryName() != null) {//若名稱不為空則取代舊值
                oldcategory.setCategoryName(category.getCategoryName());
            }
            if (category.getProductName() != null) {//若名稱不為空則取代舊值
                oldcategory.setProductName(category.getProductName());
            }
            if (category.getProductType() != null) {//若名稱不為空則取代舊值
                oldcategory.setProductType(category.getProductType());
            }
            if (category.getProductDefaultProcess() != null) {//若名稱不為空則取代舊值
                oldcategory.setProductDefaultProcess(category.getProductDefaultProcess());
            }

            final ProductCategory result = Dao.save(oldcategory);
            oldcategory.setSuccessful(result != null);
            oldcategory.setMessage("修改成功");
            return oldcategory;
        } else {
            return null;
        }
    }

    @Override
    public List<ProductCategory> findAll() {
        return Dao.findAll();
    }

    @Override
    public ProductCategory findByPK(Integer categoryId) {
        Optional<ProductCategory> category = Dao.findById(categoryId);
        if (category.isPresent()) {
            ProductCategory category2 = category.get();
            return category2;
        }
        return null;
    }

    @Override
    public boolean remove(Integer categoryId) {
        try {
            Dao.deleteById(categoryId);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


}
