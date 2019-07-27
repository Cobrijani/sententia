package com.github.cobrijani.sententia.web.rest;

import com.github.cobrijani.sententia.ArticleApp;
import com.github.cobrijani.sententia.domain.Article;
import com.github.cobrijani.sententia.repository.ArticleRepository;
import com.github.cobrijani.sententia.service.ArticleService;
import com.github.cobrijani.sententia.service.dto.ArticleDTO;
import com.github.cobrijani.sententia.service.mapper.ArticleMapper;
import com.github.cobrijani.sententia.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;


import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.github.cobrijani.sententia.web.rest.TestUtil.sameInstant;
import static com.github.cobrijani.sententia.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.github.cobrijani.sententia.domain.enumeration.Markup;
/**
 * Integration tests for the {@Link ArticleResource} REST controller.
 */
@SpringBootTest(classes = ArticleApp.class)
public class ArticleResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Markup DEFAULT_TYPE = Markup.PLAIN;
    private static final Markup UPDATED_TYPE = Markup.HTML;

    private static final String DEFAULT_CATEGORY = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORY = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHOR_ID = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR_ID = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHOR_NAME = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR_NAME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_MODIFIED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MODIFIED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_PUBLISHED = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PUBLISHED = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_RELEASED_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_RELEASED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT_HASH = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT_HASH = "BBBBBBBBBB";

    private static final String DEFAULT_RELEASED_CONTENT_HASH = "AAAAAAAAAA";
    private static final String UPDATED_RELEASED_CONTENT_HASH = "BBBBBBBBBB";

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ArticleMapper articleMapper;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restArticleMockMvc;

    private Article article;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArticleResource articleResource = new ArticleResource(articleService);
        this.restArticleMockMvc = MockMvcBuilders.standaloneSetup(articleResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Article createEntity() {
        Article article = new Article()
            .title(DEFAULT_TITLE)
            .type(DEFAULT_TYPE)
            .category(DEFAULT_CATEGORY)
            .authorId(DEFAULT_AUTHOR_ID)
            .authorName(DEFAULT_AUTHOR_NAME)
            .created(DEFAULT_CREATED)
            .modified(DEFAULT_MODIFIED)
            .published(DEFAULT_PUBLISHED)
            .content(DEFAULT_CONTENT)
            .releasedContent(DEFAULT_RELEASED_CONTENT)
            .contentHash(DEFAULT_CONTENT_HASH)
            .releasedContentHash(DEFAULT_RELEASED_CONTENT_HASH);
        return article;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Article createUpdatedEntity() {
        Article article = new Article()
            .title(UPDATED_TITLE)
            .type(UPDATED_TYPE)
            .category(UPDATED_CATEGORY)
            .authorId(UPDATED_AUTHOR_ID)
            .authorName(UPDATED_AUTHOR_NAME)
            .created(UPDATED_CREATED)
            .modified(UPDATED_MODIFIED)
            .published(UPDATED_PUBLISHED)
            .content(UPDATED_CONTENT)
            .releasedContent(UPDATED_RELEASED_CONTENT)
            .contentHash(UPDATED_CONTENT_HASH)
            .releasedContentHash(UPDATED_RELEASED_CONTENT_HASH);
        return article;
    }

    @BeforeEach
    public void initTest() {
        articleRepository.deleteAll();
        article = createEntity();
    }

    @Test
    public void createArticle() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);
        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isCreated());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate + 1);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testArticle.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testArticle.getCategory()).isEqualTo(DEFAULT_CATEGORY);
        assertThat(testArticle.getAuthorId()).isEqualTo(DEFAULT_AUTHOR_ID);
        assertThat(testArticle.getAuthorName()).isEqualTo(DEFAULT_AUTHOR_NAME);
        assertThat(testArticle.getCreated()).isEqualTo(DEFAULT_CREATED);
        assertThat(testArticle.getModified()).isEqualTo(DEFAULT_MODIFIED);
        assertThat(testArticle.getPublished()).isEqualTo(DEFAULT_PUBLISHED);
        assertThat(testArticle.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testArticle.getReleasedContent()).isEqualTo(DEFAULT_RELEASED_CONTENT);
        assertThat(testArticle.getContentHash()).isEqualTo(DEFAULT_CONTENT_HASH);
        assertThat(testArticle.getReleasedContentHash()).isEqualTo(DEFAULT_RELEASED_CONTENT_HASH);
    }

    @Test
    public void createArticleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = articleRepository.findAll().size();

        // Create the Article with an existing ID
        article.setId("existing_id");
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleRepository.findAll().size();
        // set the field null
        article.setTitle(null);

        // Create the Article, which fails.
        ArticleDTO articleDTO = articleMapper.toDto(article);

        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkCategoryIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleRepository.findAll().size();
        // set the field null
        article.setCategory(null);

        // Create the Article, which fails.
        ArticleDTO articleDTO = articleMapper.toDto(article);

        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkAuthorIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleRepository.findAll().size();
        // set the field null
        article.setAuthorId(null);

        // Create the Article, which fails.
        ArticleDTO articleDTO = articleMapper.toDto(article);

        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkAuthorNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleRepository.findAll().size();
        // set the field null
        article.setAuthorName(null);

        // Create the Article, which fails.
        ArticleDTO articleDTO = articleMapper.toDto(article);

        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkContentHashIsRequired() throws Exception {
        int databaseSizeBeforeTest = articleRepository.findAll().size();
        // set the field null
        article.setContentHash(null);

        // Create the Article, which fails.
        ArticleDTO articleDTO = articleMapper.toDto(article);

        restArticleMockMvc.perform(post("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllArticles() throws Exception {
        // Initialize the database
        articleRepository.save(article);

        // Get all the articleList
        restArticleMockMvc.perform(get("/api/articles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(article.getId())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].category").value(hasItem(DEFAULT_CATEGORY.toString())))
            .andExpect(jsonPath("$.[*].authorId").value(hasItem(DEFAULT_AUTHOR_ID.toString())))
            .andExpect(jsonPath("$.[*].authorName").value(hasItem(DEFAULT_AUTHOR_NAME.toString())))
            .andExpect(jsonPath("$.[*].created").value(hasItem(sameInstant(DEFAULT_CREATED))))
            .andExpect(jsonPath("$.[*].modified").value(hasItem(sameInstant(DEFAULT_MODIFIED))))
            .andExpect(jsonPath("$.[*].published").value(hasItem(sameInstant(DEFAULT_PUBLISHED))))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].releasedContent").value(hasItem(DEFAULT_RELEASED_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].contentHash").value(hasItem(DEFAULT_CONTENT_HASH.toString())))
            .andExpect(jsonPath("$.[*].releasedContentHash").value(hasItem(DEFAULT_RELEASED_CONTENT_HASH.toString())));
    }
    
    @Test
    public void getArticle() throws Exception {
        // Initialize the database
        articleRepository.save(article);

        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", article.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(article.getId()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.category").value(DEFAULT_CATEGORY.toString()))
            .andExpect(jsonPath("$.authorId").value(DEFAULT_AUTHOR_ID.toString()))
            .andExpect(jsonPath("$.authorName").value(DEFAULT_AUTHOR_NAME.toString()))
            .andExpect(jsonPath("$.created").value(sameInstant(DEFAULT_CREATED)))
            .andExpect(jsonPath("$.modified").value(sameInstant(DEFAULT_MODIFIED)))
            .andExpect(jsonPath("$.published").value(sameInstant(DEFAULT_PUBLISHED)))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.releasedContent").value(DEFAULT_RELEASED_CONTENT.toString()))
            .andExpect(jsonPath("$.contentHash").value(DEFAULT_CONTENT_HASH.toString()))
            .andExpect(jsonPath("$.releasedContentHash").value(DEFAULT_RELEASED_CONTENT_HASH.toString()));
    }

    @Test
    public void getNonExistingArticle() throws Exception {
        // Get the article
        restArticleMockMvc.perform(get("/api/articles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateArticle() throws Exception {
        // Initialize the database
        articleRepository.save(article);

        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Update the article
        Article updatedArticle = articleRepository.findById(article.getId()).get();
        updatedArticle
            .title(UPDATED_TITLE)
            .type(UPDATED_TYPE)
            .category(UPDATED_CATEGORY)
            .authorId(UPDATED_AUTHOR_ID)
            .authorName(UPDATED_AUTHOR_NAME)
            .created(UPDATED_CREATED)
            .modified(UPDATED_MODIFIED)
            .published(UPDATED_PUBLISHED)
            .content(UPDATED_CONTENT)
            .releasedContent(UPDATED_RELEASED_CONTENT)
            .contentHash(UPDATED_CONTENT_HASH)
            .releasedContentHash(UPDATED_RELEASED_CONTENT_HASH);
        ArticleDTO articleDTO = articleMapper.toDto(updatedArticle);

        restArticleMockMvc.perform(put("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isOk());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
        Article testArticle = articleList.get(articleList.size() - 1);
        assertThat(testArticle.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testArticle.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testArticle.getCategory()).isEqualTo(UPDATED_CATEGORY);
        assertThat(testArticle.getAuthorId()).isEqualTo(UPDATED_AUTHOR_ID);
        assertThat(testArticle.getAuthorName()).isEqualTo(UPDATED_AUTHOR_NAME);
        assertThat(testArticle.getCreated()).isEqualTo(UPDATED_CREATED);
        assertThat(testArticle.getModified()).isEqualTo(UPDATED_MODIFIED);
        assertThat(testArticle.getPublished()).isEqualTo(UPDATED_PUBLISHED);
        assertThat(testArticle.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testArticle.getReleasedContent()).isEqualTo(UPDATED_RELEASED_CONTENT);
        assertThat(testArticle.getContentHash()).isEqualTo(UPDATED_CONTENT_HASH);
        assertThat(testArticle.getReleasedContentHash()).isEqualTo(UPDATED_RELEASED_CONTENT_HASH);
    }

    @Test
    public void updateNonExistingArticle() throws Exception {
        int databaseSizeBeforeUpdate = articleRepository.findAll().size();

        // Create the Article
        ArticleDTO articleDTO = articleMapper.toDto(article);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArticleMockMvc.perform(put("/api/articles")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(articleDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Article in the database
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteArticle() throws Exception {
        // Initialize the database
        articleRepository.save(article);

        int databaseSizeBeforeDelete = articleRepository.findAll().size();

        // Delete the article
        restArticleMockMvc.perform(delete("/api/articles/{id}", article.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Article> articleList = articleRepository.findAll();
        assertThat(articleList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Article.class);
        Article article1 = new Article();
        article1.setId("id1");
        Article article2 = new Article();
        article2.setId(article1.getId());
        assertThat(article1).isEqualTo(article2);
        article2.setId("id2");
        assertThat(article1).isNotEqualTo(article2);
        article1.setId(null);
        assertThat(article1).isNotEqualTo(article2);
    }

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ArticleDTO.class);
        ArticleDTO articleDTO1 = new ArticleDTO();
        articleDTO1.setId("id1");
        ArticleDTO articleDTO2 = new ArticleDTO();
        assertThat(articleDTO1).isNotEqualTo(articleDTO2);
        articleDTO2.setId(articleDTO1.getId());
        assertThat(articleDTO1).isEqualTo(articleDTO2);
        articleDTO2.setId("id2");
        assertThat(articleDTO1).isNotEqualTo(articleDTO2);
        articleDTO1.setId(null);
        assertThat(articleDTO1).isNotEqualTo(articleDTO2);
    }
}
