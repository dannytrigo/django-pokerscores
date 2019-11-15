import requests

def get_avatar(backend, strategy, details, response,
        user=None, *args, **kwargs):
    try:
        url = None
        if backend.name == 'facebook':
            url = "http://graph.facebook.com/%s/picture?type=large"%response['id']
        if backend.name == 'twitter':
            url = response.get('profile_image_url', '').replace('_normal','')
        if backend.name == 'google-oauth2':
            print(response)
            url = response.get('picture', None)
            ext = url.split('.')[-1]
        if url:
            print(url)
            r = requests.get(url)
            if r.status_code == 200:
                print(r.headers)
                if r.headers.get('content-type') in ('image/jpg', 'image/jpeg'):
                    user.profile.avatar = r.content
                    user.profile.save()
    except:
        pass
