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
    changeListing,
    getListingDetails,
    ListingBrands,
    ListingCategories,
    ListingTypeWithId,
} from "@/network/hooks";
import { useState } from "react";

export default function Change() {
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

    const handleChange = async () => {
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

        const listing: ListingTypeWithId = {
            id: id,
            name: itemName,
            description: description,
            price: price,
            category: category as ListingCategories,
            img_url: imageUrl,
            brand: brand as ListingBrands,
            rating: rating,
        };

        toast({
            title: "Item is being changed...",
        });

        await changeListing(listing);

        toast({
            title: "Item has been changed",
        });
    };

    const handleOnBlur = async () => {
        const listingDetails = await getListingDetails(id);
        if (listingDetails) {
            setIdValid(true);
            setItemName(listingDetails["name"]);
            setDescription(listingDetails["description"]);
            setPrice(listingDetails["price"]);
            setCategory(listingDetails["category"]);
            setImageUrl(listingDetails["img_url"]);
            setBrand(listingDetails["brand"]);
            setRating(listingDetails["rating"]);
        } else {
            setIdValid(false);
            setItemName("");
            setDescription("");
            setPrice(0);
            setCategory("");
            setImageUrl("");
            setBrand("");
            setRating(0);
        }

        // console.log(listingDetails);
    };

    const [id, setId] = useState(0);

    const [isIdValid, setIdValid] = useState(false);

    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [brand, setBrand] = useState("");
    const [rating, setRating] = useState(0);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Change Page</h1>
            <div className="rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Change item</h2>

                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">ID:</p>
                    <Input
                        className="col-span-4"
                        value={id}
                        type="number"
                        onChange={(e) => setId(parseInt(e.target.value))}
                        onBlur={handleOnBlur}
                    />
                </div>

                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Item Name:</p>
                    <Input
                        disabled={!isIdValid}
                        className="col-span-4"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>

                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Description:</p>
                    <Input
                        className="col-span-4"
                        disabled={!isIdValid}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Price:</p>
                    <Input
                        type="number"
                        disabled={!isIdValid}
                        className="col-span-4"
                        min={0}
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </div>
                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Category:</p>
                    <Select
                        onValueChange={(value) => setCategory(value)}
                        value={category}
                    >
                        <SelectTrigger
                            className="col-span-4"
                            disabled={!isIdValid}
                        >
                            <SelectValue placeholder={"Select Category"} />
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
                        disabled={!isIdValid}
                        className="col-span-4"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <div className="grid gap-4 grid-cols-6 items-center p-4">
                    <p className="font-semibold text-right">Brand:</p>
                    <Select
                        onValueChange={(value) => setBrand(value)}
                        value={brand}
                    >
                        <SelectTrigger
                            className="col-span-4"
                            disabled={!isIdValid}
                        >
                            <SelectValue placeholder={"Select Brand"} />
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
                        disabled={!isIdValid}
                        type="number"
                        className="col-span-4"
                        min={0}
                        max={5}
                        value={rating}
                        onChange={(e) => setRating(parseFloat(e.target.value))}
                    />
                </div>

                <div className="flex justify-end">
                    <Button onClick={handleChange}>Change</Button>
                </div>
            </div>
        </div>
    );
}
