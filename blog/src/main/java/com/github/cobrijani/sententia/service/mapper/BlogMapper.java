package com.github.cobrijani.sententia.service.mapper;

import com.github.cobrijani.sententia.domain.*;
import com.github.cobrijani.sententia.service.dto.BlogDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Blog} and its DTO {@link BlogDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BlogMapper extends EntityMapper<BlogDTO, Blog> {



    default Blog fromId(String id) {
        if (id == null) {
            return null;
        }
        Blog blog = new Blog();
        blog.setId(id);
        return blog;
    }
}