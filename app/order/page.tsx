'use client';
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useEffect, useState, useMemo } from "react";

type OrderItem = {
    orderNumber: number;
    numberOfPieces: number;
    cb: string;
};

type Style = {
    label: string;
    value: number;
}

function formattedDate() {
    // 创建一个 Date 对象
    const today = new Date();

    // 获取年、月、日、时、分
    const year = today.getFullYear(); // 年（四位数）
    const month = today.getMonth() + 1; // 月（0-11，需要加 1）
    const day = today.getDate(); // 日（1-31）
    const hours = today.getHours(); // 时（0-23）
    const minutes = today.getMinutes(); // 分（0-59）
    const seconds = today.getSeconds(); // 秒（0-59）
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;


    // 格式化月份和分钟，确保两位数显示
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // 组合成完整的日期时间字符串
    return `${year}-${formattedMonth}-${day} ${hours}:${formattedMinutes}:${formattedSeconds}`
}

function _computedAll(dynamicVaildateForm: OrderItem[]) {
    let total = 0
    let danshu = 0
    let numberOfPieces = 0
    dynamicVaildateForm.forEach((item: any) => {
        total += +(item.numberOfPieces * +item.cb).toFixed(1)
        danshu += +item.orderNumber
        numberOfPieces += +item.numberOfPieces
    })
    return { total, danshu, numberOfPieces }
}



export default function Order() {

    // const [快递, setST] = useState(2.1)
    // const [rengong, setRG] = useState(0.7)



    const defaultOrder: OrderItem[] = [{
        orderNumber: 1,
        numberOfPieces: 1,
        cb: '',
    }]

    const [isClient, setIsClient] = useState(false)
    const [styles, setStyles] = useState<Style[] | null>(null)
    const [dynamicVaildateForm, setDynamicVaildateForm] = useState<OrderItem[]>(defaultOrder);


    useEffect(() => {
        const savedForm = localStorage.getItem('dynamicVaildateForm');
        if (savedForm) {
            setDynamicVaildateForm(JSON.parse(savedForm));
        }

        const savedStyles = localStorage.getItem('message');
        if (savedStyles) {
            setStyles(JSON.parse(savedStyles))
        }
        setIsClient(true)
    }, [])


    function addOrder() {
        
        setDynamicVaildateForm([...dynamicVaildateForm, ...defaultOrder])
    }


    useEffect(() => {
        if (isClient) {
            localStorage.setItem('dynamicVaildateForm', JSON.stringify(dynamicVaildateForm))
        }
    }, [dynamicVaildateForm, isClient])


    function deleteOrder(index: number) {
        const n = dynamicVaildateForm.filter((t, i) => i !== index)
        setDynamicVaildateForm(n)
    }
    // 订单数
    function updateOrderItem(index: number, newValues: Partial<OrderItem>) {
        const newForm = dynamicVaildateForm.map((item, i) => {
            if (i === index) {
                return { ...item, ...newValues };
            }
            return item;
        });
        setDynamicVaildateForm(newForm);
    }

    const all = useMemo(() => {
        return _computedAll(dynamicVaildateForm);
    }, [dynamicVaildateForm]);

   
    function clearOrder() {
        setDynamicVaildateForm([])
    }
    const [tableData, setTableData] = useState<{ now: string; amount: number }[]>([])
    // 录入系统
    function computerHandeler() {
        const now = formattedDate()
        const amount = all.total
        setTableData([{ now, amount }, ...tableData])
    }


    if (!isClient || !styles) return null 

    return <div className="p-10">

        <Button onClick={clearOrder} className="w-full my-6 bg-orange-400">清空</Button>

        {dynamicVaildateForm.map((item, index) => {
            return <div key={index} className="flex items-center space-x-2 pb-4">
                <Select onValueChange={(e) => updateOrderItem(index, { cb: e })} value={item.cb}>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="请选择订单" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            styles.map((item: {label: string, value: number}) => {
                                return <SelectItem key={item.label} value={item.value + ''}>{item.label}</SelectItem>
                            })
                        }
                    </SelectContent>
                </Select>
                <Input
                    type="number"
                    min={1}
                    className="w-auto"
                    onChange={e => updateOrderItem(index, { orderNumber: +e.target.value })}
                    value={item.orderNumber}
                    id="orderNumber"
                    placeholder="订单数"
                />
                <Input
                    onChange={e => updateOrderItem(index, { numberOfPieces: +e.target.value })}
                    type="number"
                    min={1}
                    className="w-auto"
                    value={item.numberOfPieces}
                    id="numberOfPieces"
                    placeholder="件数"
                />
                <span className="flex-auto">单套：{(+item.cb).toFixed(1)}  = 总：{(item.numberOfPieces * +item.cb).toFixed(1)} </span>
                <Button onClick={() => deleteOrder(index)}>删除</Button>
            </div>
        })
        }
        <div className="leading-7 [&:not(:first-child)]:mt-6">
            总单数： {all.danshu} 总套数：{all.numberOfPieces} 总金额：{all.total}
        </div>
        <Button onClick={addOrder} className="w-full my-6">添加订单</Button>

        <Button onClick={computerHandeler} className="w-full my-6">录入</Button>


        <Table>
            <TableCaption>总待结算金额： { } <Button variant="destructive">一键结算</Button></TableCaption>

            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">打单时间</TableHead>
                    <TableHead>金额</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

                {
                    tableData.map(item => {
                        return <TableRow key={item.now}>
                            <TableCell className="w-[200px]">{item.now}</TableCell>
                            <TableCell >{item.amount}</TableCell>
                            <TableCell className="text-right"><Button>删除</Button></TableCell>
                        </TableRow>
                    })
                }

            </TableBody>
        </Table>

    </div>

}