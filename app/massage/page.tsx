'use client';
import { Label } from "@/components/ui/label"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useEffect, useState } from "react";


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
    message: z.array(
        z.object({
            label: z.string().min(2, {
                message: "Username must be at least 2 characters.",
            }),
            value: z.any(),
            remark: z.string().optional()
        })
    )
})




const daizi = 0.2


export default function Order() {

    const [快递, setST] = useState(2.1)
    const [rengong, setRG] = useState(0.7)


    const 短裤无口袋聚酯纤维 = 3.9

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

    const 薄长裤1无口袋 = 4.3 + rengong


    const 加绒裤子 = 8.4 + rengong

    const 加绒裤子无口袋 = 6.8 + rengong


    const 羊羔绒裤 = 10.2 + rengong


    // 加绒
    const 圆领卫衣加绒 = 9 + rengong


    const 羊羔绒连帽 = 11 + rengong
    const 羊羔绒圆领 = 9.5 + rengong


    // 初始信息
    const defaultMessage = [
        { label: '背心 + 短裤', value: 背心1 + 短裤 + daizi },
        { label: '短袖 + 短裤', value: 短袖 + 短裤 + daizi, },
        { label: '短袖 + 薄长裤', value: 短裤 + 薄长裤.toFixed(1), },
        { label: '薄卫衣 + 薄长裤', value: 薄卫衣1 + 薄长裤 + daizi, num: 2, },
        { label: '短袖1件', value: 短袖 + daizi, },
        { label: '短袖2件', value: 短袖 * 2 + daizi, },
        { label: '短袖3件', value: 短袖 * 3 + daizi, },
        { label: '背心1件', value: 背心1 + daizi, },
        { label: '背心2件', value: 背心1 * 2 + daizi, },
        { label: '背心3件', value: 背心1 * 3 + daizi, },
        { label: '薄卫衣1件', value: 薄卫衣1 + daizi },
        { label: '薄卫衣2件', value: 薄卫衣2 + daizi },
        { label: '短裤1件', value: 短裤 + daizi },
        { label: '短裤2件', value: 短裤 * 2 + daizi },
        { label: '长T恤1件', value: 长T恤 + daizi, },
        { label: '长T恤2件', value: 长T恤 * 2 + daizi, },

        { label: '薄长裤1件', value: 薄长裤 + daizi, },

        { label: '薄长裤2件', value: 薄长裤2件 + daizi, },

        { label: '薄长裤1件(无口袋)', value: 薄长裤1无口袋 + daizi, },

        { label: '薄长裤2件(无口袋)', value: 薄长裤1无口袋 * 2 + daizi, },



        { label: '长假两件1件', value: 长假两件 + daizi, },
        { label: '长假两件2件', value: 长假两件 * 2 + daizi, },
        { label: '短假两件', value: 短假两件 + daizi, },

        { label: '加绒裤子', value: 加绒裤子 + daizi, },
        { label: '加绒裤子2条装', value: 加绒裤子 * 2 + daizi, },

        { label: '加绒裤子（无口袋）', value: 加绒裤子无口袋 + daizi, key: 999 },
        { label: '加绒裤子（无口袋）2条装', value: 加绒裤子无口袋 * 2 + daizi, key: 22, },


        { label: '羊羔绒裤', value: 羊羔绒裤 + daizi, },

        { label: '圆领卫衣加绒', value: 圆领卫衣加绒 + daizi, },
        { label: '圆领卫衣加绒 + 加绒裤', value: 圆领卫衣加绒 + 加绒裤子 + daizi, },

        { label: '羊羔绒连帽', value: 羊羔绒连帽 + daizi, },
        { label: '羊羔绒连帽 2件装', value: 羊羔绒连帽 * 2 + daizi, },
        { label: '羊羔绒连帽 + 羊羔绒裤', value: 羊羔绒连帽 + 羊羔绒裤 + daizi },

        { label: '羊羔绒圆领', value: 羊羔绒圆领 + daizi },
        { label: '羊羔绒圆领 + 羊羔绒裤子', value: 羊羔绒圆领 + 羊羔绒裤 + daizi },

        { label: '随机 薄长裤', value: 薄长裤 - rengong + daizi, },
        { label: '随机 薄卫衣', value: 薄卫衣1 - rengong + daizi },
        { label: '随机 羊羔绒圆领', value: 羊羔绒圆领 - rengong + daizi, },

        { label: '随机 羊羔绒连帽', value: 羊羔绒连帽 - rengong + daizi, },
        { label: '随机 加绒裤子', value: 加绒裤子 - rengong + daizi, },
        { label: '随机 羊羔绒裤', value: 羊羔绒裤 - rengong + daizi, },
        { label: '短裤-无口袋-聚酯纤维', value: 短裤无口袋聚酯纤维 }

    ].map(item => ({
        ...item,
        value: (+item.value).toFixed(1)
    }))


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            message: global?.window !== undefined ? localStorage.getItem('message') ?
                JSON.parse(localStorage.getItem('message') || '') : defaultMessage
                || defaultMessage : defaultMessage
        }
    })

    const { fields, append, prepend } = useFieldArray({ name: 'message', control: form.control });


    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log('保存', data.message)
        try {
            localStorage.setItem('message', JSON.stringify(data.message))
            console.log('保存成功')
        } catch (error) {
            console.log(error)
        }
    }
    function onAdd() {
        console.log('添加')
        prepend({ label: '', value: 0 })
    }

    return <div className="p-10">
        <div>
            <div className="flex items-center space-x-2">
                <Label htmlFor="kuaidi">快递费用（单）：</Label>
                <Input
                    className="w-auto"
                    id="kuaidi"
                    type="number"
                    onChange={(e) => setST(+e.target.value)}
                    value={快递}
                    placeholder="快递费用"
                />
            </div>
        </div>

        <div className="mt-2">
            <div className="flex items-center space-x-2">
                <Label htmlFor="rengong">人工费用（件）：</Label>
                <Input
                    className="w-auto"
                    id="rengong"
                    type="number"
                    onChange={(e) => setRG(+e.target.value)}
                    value={rengong}
                    placeholder="人工费用"
                />
            </div>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                {
                    fields.map((fields, index) => (
                        <div key={fields.id} className="flex">
                            <FormField
                                control={form.control}
                                name={`message.${index}.label`}
                                render={({ field }) => (
                                    <FormItem className="w-96">
                                        <FormLabel>产品名</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`message.${index}.value`}
                                render={({ field }) => (
                                    <FormItem className="ml-10">
                                        <FormLabel>价格</FormLabel>
                                        <FormControl>
                                            <Input  {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`message.${index}.remark`}
                                render={({ field }) => (
                                    <FormItem className="ml-10 w-96">
                                        <FormLabel>备注</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))
                }
                <Button type="submit">Submit</Button>
            </form>
        </Form>
        <Button onClick={onAdd}>添加</Button>


    </div>

}
