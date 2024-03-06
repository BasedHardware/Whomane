"use client";
import React from "react";
import Searchbar from "@/components/ui/searchbar";
import CardList from "@/components/CardList";
import { Button } from "@/components/ui/button";


export default function Network() {
    return (
        <div className="bg-black  h-screen">
              <div className="pt-8 flex justify-center">
        <Button className="bg-blue-500 text-white" onClick={()=>{window.location.href="/new"}}>Create new scan</Button>
      </div>
            <CardList />
        </div>
    )
}