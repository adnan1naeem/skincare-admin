import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, Input, Chip, Grid, Typography } from '@material-ui/core';
import { postRequestToken } from '../components/ApiHandler'; // Adjust the import based on your file structure

const enumValues = ["Hydration", "Oilness", "Elasticity", "SkinAge"];

export default function ProductForm({ open, onClose, onSave, product }) {
    const [productData, setProductData] = useState({
        ...product,
        availableAmount: product?.availableAmount || 1, // Default to 1 if not provided
    });
    const [selectedEnums, setSelectedEnums] = useState(product?.featureImages || []); // Track selected enums
    const [errors, setErrors] = useState({}); // Track validation errors

    useEffect(() => {
        setProductData({
            ...product,
            availableAmount: product?.availableAmount || 1,
        });
        setSelectedEnums(product?.featureImages || []);
    }, [product]);

    const validate = () => {
        const errors = {};
        if (!productData.title) errors.title = "Title is required";
        if (!productData.description) errors.description = "Description is required";
        if (productData.price == null || productData.price <= 0) errors.price = "Price must be a positive number";
        if (productData.discountPrice == null || productData.discountPrice < 0) errors.discountPrice = "Discount price must be a non-negative number";
        if (!productData.productImage) errors.productImage = "Product Image URL is required";
        if (!productData.amazonUrl) errors.amazonUrl = "Amazon URL is required";
        if (!productData.hydration) errors.hydration = "Hydration is required";
        if (!productData.oil) errors.oil = "Oilness is required";
        if (!productData.elasticity) errors.elasticity = "Elasticity is required";
        if (!selectedEnums.length) errors.featureImages = "At least one feature image must be selected";
        if (!productData.detail) errors.detail = "Detail is required";
        setErrors(errors);
    
        return Object.keys(errors).length === 0;
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleEnumChange = (event) => {
        const { value } = event.target;
        setSelectedEnums(value);
        setProductData({ ...productData, featureImages: value }); // Update featureImages state
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const result = await postRequestToken('api/admin/products', productData);
                console.log('Product saved:', result);
                onSave(result);
                onClose();
            } catch (error) {
                alert('Error saving product:', error);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{productData?.id ? 'Edit Product' : 'Add Product'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    fullWidth
                    name="title"
                    value={productData?.title || ''}
                    onChange={handleInputChange}
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    name="description"
                    value={productData?.description || ''}
                    onChange={handleInputChange}
                    error={!!errors.description}
                    helperText={errors.description}
                />
                <TextField
                    margin="dense"
                    label="Price"
                    fullWidth
                    name="price"
                    type="number"
                    value={productData?.price || ''}
                    onChange={handleInputChange}
                    error={!!errors.price}
                    helperText={errors.price}
                />
                <TextField
                    margin="dense"
                    label="Discount Price"
                    fullWidth
                    name="discountPrice"
                    type="number"
                    value={productData?.discountPrice || ''}
                    onChange={handleInputChange}
                    error={!!errors.discountPrice}
                    helperText={errors.discountPrice}
                />
                <TextField
                    margin="dense"
                    label="Product Image URL"
                    fullWidth
                    name="productImage"
                    value={productData?.productImage || ''}
                    onChange={handleInputChange}
                    error={!!errors.productImage}
                    helperText={errors.productImage}
                />
                <TextField
                    margin="dense"
                    label="Amazon URL"
                    fullWidth
                    name="amazonUrl"
                    value={productData?.amazonUrl || ''}
                    onChange={handleInputChange}
                    error={!!errors.amazonUrl}
                    helperText={errors.amazonUrl}
                />
                <TextField
                    margin="dense"
                    label="Detail"
                    fullWidth
                    name="detail"
                    multiline
                    rows={4}
                    value={productData?.detail || ''}
                    error={!!errors.detail}
                    onChange={handleInputChange}
                />
                <Grid container spacing={2} style={{ marginTop: 20, marginBottom: 20 }}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h8">Hydration</Typography>
                        <Select
                            margin="dense"
                            label="Hydration"
                            fullWidth
                            name="hydration"
                            value={productData?.hydration || ''}
                            onChange={handleInputChange}
                            input={<Input />}
                            error={!!errors.hydration}
                        >
                            {["low", "medium", "high"].map(option => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h8">Oilness</Typography>
                        <Select
                            margin="dense"
                            label="Oil"
                            fullWidth
                            name="oil"
                            value={productData?.oil || ''}
                            onChange={handleInputChange}
                            input={<Input />}
                            error={!!errors.oil}
                        >
                            {["low", "medium", "high"].map(option => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h8">Elasticity</Typography>
                        <Select
                            margin="dense"
                            label="Elasticity"
                            fullWidth
                            name="elasticity"
                            value={productData?.elasticity || ''}
                            onChange={handleInputChange}
                            input={<Input />}
                            error={!!errors.elasticity}
                        >
                            {["low", "medium", "high"].map(option => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <Typography variant="h8">Feature Images</Typography>
                <Select
                    multiple
                    margin="dense"
                    fullWidth
                    name="featureImages"
                    value={selectedEnums}
                    onChange={handleEnumChange}
                    renderValue={selected => (
                        <div>
                            {selected.map(value => (
                                <Chip key={value} label={value} style={{ margin: '2px' }} />
                            ))}
                        </div>
                    )}
                    input={<Input />}
                    error={!!errors.featureImages}
                >
                    {enumValues.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
                {errors.featureImages && (
                    <Typography color="error">{errors.featureImages}</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
