import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { MDXRemote } from "next-mdx-remote/rsc";
import CodeSnippet from "@/components/CodeSnippet";

export async function generateMetadata({ params }) {
  const { postSlug: slug } = await params;
  const blogPost = await loadBlogPost(slug);

  return {
    title: blogPost.frontmatter.title,
    description: blogPost.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug: slug } = await params;
  const blogPost = await loadBlogPost(slug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={blogPost.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote
          source={blogPost.content}
          components={{ pre: CodeSnippet }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
