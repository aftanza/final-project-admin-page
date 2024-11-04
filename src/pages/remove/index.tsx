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
    getListingDetails,
    ListingBrands,
    ListingCategories,
    removeListing,
} from "@/network/hooks";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function Remove() {
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

    const handleRemove = async () => {
        if (!itemName) {
            toast({
                title: "Item does not exist",
            });
            return;
        }

        toast({
            title: "Item is being removed...",
        });

        await removeListing(id);

        toast({
            title: "Item has been removed",
        });
    };

    const handleOnBlur = async () => {
        const listingDetails = await getListingDetails(id);
        if (listingDetails) {
            setItemName(listingDetails["name"]);
            setDescription(listingDetails["description"]);
            setPrice(listingDetails["price"]);
            setCategory(listingDetails["category"]);
            setImageUrl(listingDetails["img_url"]);
            setBrand(listingDetails["brand"]);
            setRating(listingDetails["rating"]);
        } else {
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

    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [brand, setBrand] = useState("");
    const [rating, setRating] = useState(0);

    return (
        <div className="space-y-6">
            <AlertDialog>
                <h1 className="text-2xl font-bold">Remove Page</h1>
                <div className="rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Remove item</h2>

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
                            disabled
                            className="col-span-4"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-4 grid-cols-6 items-center p-4">
                        <p className="font-semibold text-right">Description:</p>
                        <Input
                            className="col-span-4"
                            disabled
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-4 grid-cols-6 items-center p-4">
                        <p className="font-semibold text-right">Price:</p>
                        <Input
                            type="number"
                            disabled
                            className="col-span-4"
                            min={0}
                            value={price}
                            onChange={(e) =>
                                setPrice(parseFloat(e.target.value))
                            }
                        />
                    </div>
                    <div className="grid gap-4 grid-cols-6 items-center p-4">
                        <p className="font-semibold text-right">Category:</p>
                        <Select
                            onValueChange={(value) => setCategory(value)}
                            value={category}
                        >
                            <SelectTrigger className="col-span-4" disabled>
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
                            disabled
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
                            <SelectTrigger className="col-span-4" disabled>
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
                            disabled
                            type="number"
                            className="col-span-4"
                            min={0}
                            max={5}
                            value={rating}
                            onChange={(e) =>
                                setRating(parseFloat(e.target.value))
                            }
                        />
                    </div>

                    <div className="flex justify-end">
                        <AlertDialogTrigger asChild>
                            <Button>Remove</Button>
                        </AlertDialogTrigger>
                    </div>
                </div>

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleRemove}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
