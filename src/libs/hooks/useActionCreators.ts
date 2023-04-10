import {ActionCreatorsMapObject, bindActionCreators} from "@reduxjs/toolkit";
import {useAppDispatch} from "@/libs/hooks/useAppDispatch";
import {useMemo} from "react";


export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions) => {
    const dispatch = useAppDispatch()
    return useMemo(() => bindActionCreators(actions, dispatch), [])
}