"use client";
import React from "react";
import { Textarea } from "@/components/ui/textarea"
import Searchbar from "@/components/ui/searchbar";
import PersonCard from "@/components/ui/personcard";


export default function Network() {
    return (
        <div className="bg-black  h-screen">
            <Searchbar />
            <PersonCard />
        </div>
    )
}