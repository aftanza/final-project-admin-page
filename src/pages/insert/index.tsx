import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
    insertListing,
    ListingBrands,
    ListingCategories,
    ListingType,
} from "@/network/hooks";
import { useState } from "react";

export default function Insert() {
    const { toast } = useToast();

    const categories: ListingCategories[] = [
        "keyboards",
        "mice",
        "gpu",
        "cpu",
        "ram",
        "prebuilt",
    ];

    const brands: ListingBrands[] = [
        "apple",
        "samsung",
        "sony",
        "dell",
        "asus",
    ];

    const handleInsert = async () => {
        if (
            !itemName.trim() ||
            !description.trim() ||
            price <= 0 ||
            !category.trim() ||
            !imageUrl.trim() ||
            !brand.trim() ||
            rating < 0 ||
            rating > 5
        ) {
            toast({
                title: "Please fill out all fields correctly.",
            });
            return;
        }

        const listing: ListingType = {
            name: itemName,
            description: description,
            price: price,
            category: category as ListingCategories,
            img_url: imageUrl,
            brand: brand as ListingBrands,
            rating: rating,
        };

        toast({
            title: "Item is being inserted...",
        });

        await insertListing(listing);

        toast({
            title: "Item has been inserted",
        });
    };

    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [brand, setBrand] = useState("");
    const [rating, setRating] = useState(0);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Insert Page</h1>
            <div className="rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Insert new item</h2>
                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Item Name:</p>
                    <Input
                        className="col-span-4"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Description:</p>
                    <Input
                        className="col-span-4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Price:</p>
                    <Input
                        type="number"
                        className="col-span-4"
                        min={0}
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </div>
                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Category:</p>
                    <Select onValueChange={(value) => setCategory(value)}>
                        <SelectTrigger className="col-span-4">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category, index) => (
                                <SelectItem key={index} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Image URL:</p>
                    <Input
                        className="col-span-4"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Brand:</p>
                    <Select onValueChange={(value) => setBrand(value)}>
                        <SelectTrigger className="col-span-4">
                            <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                            {brands.map((brand, index) => (
                                <SelectItem key={index} value={brand}>
                                    {brand}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">
                        Rating (Out of 5):
                    </p>
                    <Input
                        type="number"
                        className="col-span-4"
                        min={0}
                        max={5}
                        value={rating}
                        onChange={(e) => setRating(parseFloat(e.target.value))}
                    />
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleInsert}>Insert</Button>
                </div>
            </div>
        </div>
    );
}
