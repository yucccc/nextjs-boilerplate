'use client';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useEffect, useState } from "react";

type Init = {
    orderNumber: number;
    daizi: number;
    numberOfPieces: number;
    cb: string;
}[]

const 申通快递 = 1.8
const daizi = 0.1


const rengong = 0.5
const 短袖 = 4.6 + rengong
const 短裤 = 4.9 + rengong
const 背心1 = 4.4 + rengong
const 薄卫衣1 = 6.9 + rengong
const 薄卫衣2 = 薄卫衣1 * 2
const 长T恤 = 5.9 + rengong
const 长假两件 = 6.4 + rengong
const 短假两件 = 9.5 + rengong
const 薄长裤 = 6.7 + rengong
const 薄长裤2件 = 薄长裤 * 2

// 加绒
const 圆领卫衣加绒 = 9
const 加绒裤子 = 9.2
const 羊羔绒连帽 = 11
const 羊羔绒裤 = 10.2
const 羊羔绒圆领 = 9.5


const styles = [
    { label: '背心+短裤', value: 背心1 + 短裤, },
    { label: '短袖+短裤', value: 短袖 + 短裤, },
    { label: '短袖+薄长裤', value: 短裤 + 薄长裤, },
    { label: '薄卫衣+薄长裤', value: 薄卫衣1 + 薄长裤, num: 2 },

    { label: '短袖1件', value: 短袖, },
    { label: '短袖2件', value: 短袖 * 2, },
    { label: '短袖3件', value: 短袖 * 3 },

    { label: '背心1件', value: 背心1, },
    { label: '背心2件', value: 背心1 * 2, },
    { label: '背心3件', value: 背心1 * 3, },
    { label: '薄卫衣1件', value: 薄卫衣1 },
    { label: '薄卫衣2件', value: 薄卫衣2 },
    { label: '短裤1件', value: 短裤 },
    { label: '短裤2件', value: 短裤 * 2 },


    { label: '长T恤1件', value: 长T恤, },
    { label: '长T恤2件', value: 长T恤 * 2, },

    { label: '薄长裤1件', value: 薄长裤, },
    { label: '薄长裤2件', value: 薄长裤2件, key: 4 },

    { label: '长假两件1件', value: 长假两件, },
    { label: '长假两件2件', value: 长假两件 * 2, },
    { label: '短假两件', value: 短假两件, },
    { label: '圆领卫衣加绒', value: 圆领卫衣加绒, },
    { label: '加绒裤子', value: 加绒裤子, },
    { label: '羊羔绒连帽', value: 羊羔绒连帽, },
    { label: '羊羔绒裤', value: 羊羔绒裤, },
    { label: '羊羔绒圆领', value: 羊羔绒圆领, },


]


export default function Order() {

    const [dynamicVaildateForm, setDynamicVaildateForm] = useState([{}])

    useEffect(() => {
        const d = localStorage.getItem('dynamicVaildateForm')
        const init = d ? JSON.parse(d) as Init : [{
            orderNumber: 1,
            daizi: 0.1,
            numberOfPieces: 1,
            cb: '',
        }]
        setDynamicVaildateForm(init)
    }, [])


    function addOrder() {
        computedAll()
        setDynamicVaildateForm([...dynamicVaildateForm, { cb: '', orderNumber: 1, numberOfPieces: 1, daizi: 0.1 }])
    }

    useEffect(() => {
        localStorage.setItem('dynamicVaildateForm', JSON.stringify(dynamicVaildateForm))
    }, [dynamicVaildateForm])


    function deleteOrder(index: number) {
        const n = dynamicVaildateForm.filter((t, i) => i !== index)
        computedAll()
        setDynamicVaildateForm(n)
    }
    // 订单数
    function onChangeOrderNumber(value: number, index: number) {
        dynamicVaildateForm.forEach((item, i) => {
            if (i === index) {
                item.orderNumber = value
                item.daizi = +(value * 0.1).toFixed(1)
            }
        })
        computedAll()
        setDynamicVaildateForm([...dynamicVaildateForm])
    }

    function onChangeNumberOfPieces(value: number, index: number) {
        dynamicVaildateForm.forEach((item, i) => {
            if (i === index) {
                item.numberOfPieces = value
            }
        })
        computedAll()
        setDynamicVaildateForm([...dynamicVaildateForm])
    }
    function onSelect(v: number, index: number) {
        dynamicVaildateForm.forEach((item, i) => {
            if (i === index) {
                item.cb = v + ''
            }
        })
        computedAll()
        setDynamicVaildateForm([...dynamicVaildateForm])

    }
    const [all, setAll] = useState({ total: 0, danshu: 0, numberOfPieces: 0 })

    function computedAll() {
        let total = 0
        let danshu = 0
        let numberOfPieces = 0
        dynamicVaildateForm.forEach(item => {
            total += +(item.daizi + item.numberOfPieces * +item.cb).toFixed(1)
            danshu += +item.orderNumber
            numberOfPieces += +item.numberOfPieces
            // 重件数
            console.log(item)
        })
        setAll({ total, danshu, numberOfPieces })
    }
    function clearOrder() {
        setDynamicVaildateForm([])
    }



    return <div className="p-10">
        <Button onClick={clearOrder} className="w-full my-6 bg-orange-400">清空</Button>

        {dynamicVaildateForm.map((item, index) => {
            return <div key={index} className="flex items-center space-x-2 pb-4">
                <Select onValueChange={(e) => onSelect(+e, index)} value={item.cb}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="请选择订单" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            styles.map(item => {
                                return <SelectItem key={item.label} value={item.value + ''}>{item.label}</SelectItem>
                            })
                        }
                    </SelectContent>
                </Select>
                <Input
                    type="number"
                    min={1}
                    className="w-auto"
                    onChange={e => onChangeOrderNumber(+e.target.value, index)}
                    value={item.orderNumber}
                    id="orderNumber"
                    placeholder="订单数"
                />
                <Input
                    onChange={e => onChangeNumberOfPieces(+e.target.value, index)}
                    type="number"
                    min={1}
                    className="w-auto"
                    value={item.numberOfPieces}
                    id="numberOfPieces"
                    placeholder="件数"
                />
                <span className="flex-auto">袋子：{item.daizi} + 单套（人工+货本）：{(+item.cb).toFixed(1)} (个本： {(+item.cb) + daizi  + 申通快递}) = {(item.numberOfPieces * +item.cb + item.daizi).toFixed(1)} </span>
                <Button onClick={() => deleteOrder(index)}>删除</Button>
            </div>
        })
        }
        <div className="leading-7 [&:not(:first-child)]:mt-6">
            总单数： {all.danshu} 总套数：{all.numberOfPieces} 总金额：{all.total}
        </div>
        <Button onClick={addOrder} className="w-full my-6">添加订单</Button>

    </div>

}