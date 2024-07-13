<template>
    <div class="tag-wrapper">
        <span v-bind="props" ref="tagRef" class="tag" />
    </div>
</template>
<script lang="ts" setup>
/* 数据状态变量管理 -----------------------------------------------------------*/
const tagRef = ref<HTMLSpanElement>();
const props = defineProps({
    text: {
        type: String,
        default: '',
        required: false
    },
    theme: {
        type: String,
        default: '',
        required: false
    }
});
/* 生命周期 ------------------------------------------------------------------*/
onMounted(() => {
    setText();
    setTheme();
});

/* 函数逻辑------------------------------------------------------------------ */
/**
 * 更新文本
 */
const setText = () => {
    // ! 防止空指针错误,强制解包
    tagRef.value!.innerText = props.text;
};
/**
 * 更新主题
 */
const setTheme = () => {
    // 优化
    if (tagRef.value) {
        // 清空之前的 theme 类（假设以 'theme-' 开头）
        tagRef.value.classList.forEach(className => {
            if (className.startsWith('theme-')) {
                tagRef.value!.classList.remove(className);
            }
        });
        // 添加新的 theme 类（这里假设需要添加 'theme-' 前缀）
        if (props.theme) {
            tagRef.value.classList.add(`theme-${props.theme}`);
        }
        // 确保始终有 'tag' 类
        tagRef.value.classList.add('tag');
    }
};
</script>
<style lang="less">
.tag-wrapper {
    display: inline-block;
    margin: 0 30px;

    .tag {
        display: block;
        padding: 10px;
        font-size: 18px;
        color: white;
        background: rgb(2 115 167 / 63%);
        border-radius: 5px;
    }

    .theme-red {
        color: aqua;
        background: red;
    }
}
</style>
