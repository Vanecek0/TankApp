import { useEffect, useState } from 'react';
import { Redirect, useRouter } from 'expo-router';
//import { isFirstLaunch } from '../lib/storage';
//import { initDatabase } from '../lib/database';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    return(
        <Redirect href="/home"></Redirect>
    )
   
}