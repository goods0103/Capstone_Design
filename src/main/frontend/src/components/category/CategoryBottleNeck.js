import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";

function CategoryBottleNeck() {


    return (
        <>
            <CategoryBar></CategoryBar>
            병목 현상 뭐시기
        </>
    );
}

export default CategoryBottleNeck;